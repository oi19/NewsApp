import React, { useState, useMemo, useCallback } from "react";
import { View, TextInput, FlatList, Text } from "react-native";
import { NewsService } from "../../../application/NewsService";
import ArticleItem from "../../components/ArticleItem/ArticleItem";
import Loading from "../../components/Loading/Loading";
import ErrorView from "../../components/ErrorView/ErrorView";
import { useNavigation } from "@react-navigation/native";
import useDebounce from "../../../shared/hooks/useDebounce";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../navigation/AppNavigator";
import styles from "./styles";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data, isLoading, error, refetch } = NewsService.useSearchNews({
    q: debouncedQuery,
  });

  const renderItem = useCallback(
    ({ item }) => (
      <ArticleItem
        article={item}
        searchWord={debouncedQuery}
        onPress={() => navigation.navigate("Details", { article: item })}
      />
    ),
    [debouncedQuery, navigation]
  );

  const keyExtractor = useCallback((item, index) => `${item.url}_${index}`, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchInputContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Search by title or author"
            onChangeText={setQuery}
            value={query}
            style={styles.searchInput}
            placeholderTextColor="#bdbdbd"
            returnKeyType="search"
            autoFocus
          />
        </View>
        {isLoading && <Loading />}
        {error && (
          <ErrorView
            message="Failed to load search results."
            onRetry={refetch}
          />
        )}
        {!isLoading &&
          !error &&
          (!data || data.length === 0) &&
          debouncedQuery.length > 0 && (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateText}>No results found</Text>
              <Text style={styles.emptyStateIcon}>🔍</Text>
            </View>
          )}
        <FlatList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
          style={styles.list}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </View>
  );
}
