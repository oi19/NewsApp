import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from "react";
import { View, FlatList, TextInput, Text } from "react-native";
import { NewsService } from "../../../application/NewsService";
import ArticleItem from "../../components/ArticleItem/ArticleItem";
import Loading from "../../components/Loading/Loading";
import ErrorView from "../../components/ErrorView/ErrorView";
import { useNavigation } from "@react-navigation/native";
import type { StackNavigationProp } from "@react-navigation/stack";
import type { RootStackParamList } from "../../../navigation/AppNavigator";
import useDebounce from "../../../shared/hooks/useDebounce";
import styles from "./styles";
import { Feather } from "@expo/vector-icons";

export default function HomeScreen() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 500);
  const pageSize = 20;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  // Track if search is active
  const isSearching = debouncedQuery.length > 0;

  // Search logic (now paginated)
  const {
    data: searchData,
    isLoading: isSearchLoading,
    error: searchError,
    refetch: refetchSearch,
    fetchNextPage: fetchNextSearchPage,
    hasNextPage: hasNextSearchPage,
    isFetchingNextPage: isFetchingNextSearchPage,
  } = NewsService.usePaginatedNews(
    isSearching ? { q: debouncedQuery } : { lang: "en" },
    pageSize
  );

  const searchArticles = useMemo(() => {
    const all = searchData?.pages.flatMap((page) => page.articles) || [];
    const seen = new Set();
    return all.filter((article) => {
      if (seen.has(article.url)) return false;
      seen.add(article.url);
      return true;
    });
  }, [searchData]);

  const onEndReachedSearch = useCallback(() => {
    if (hasNextSearchPage && !isFetchingNextSearchPage) {
      fetchNextSearchPage();
    }
  }, [hasNextSearchPage, isFetchingNextSearchPage, fetchNextSearchPage]);

  // Headlines logic
  const {
    data,
    isLoading,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = NewsService.usePaginatedNews({ lang: "en" }, pageSize);

  const articles = useMemo(
    () => data?.pages.flatMap((page) => page.articles) || [],
    [data]
  );
  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const renderSearchItem = useCallback(
    ({ item }) => (
      <ArticleItem
        article={item}
        searchWord={debouncedQuery}
        onPress={() => navigation.navigate("Details", { article: item })}
      />
    ),
    [debouncedQuery, navigation]
  );

  const renderHeadlineItem = useCallback(
    ({ item }) => (
      <ArticleItem
        article={item}
        onPress={() => navigation.navigate("Details", { article: item })}
      />
    ),
    [navigation]
  );

  const keyExtractor = useCallback((item, index) => `${item.url}_${index}`, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.searchInputContainer}>
          <Feather
            name="search"
            size={20}
            color="#bdbdbd"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search by title or author"
            onChangeText={setQuery}
            value={query}
            style={styles.searchInput}
            placeholderTextColor="#bdbdbd"
            returnKeyType="search"
          />
        </View>
        {isSearching ? (
          <>
            {isSearchLoading && <Loading />}
            {searchError && (
              <ErrorView
                message="Failed to load search results."
                onRetry={refetchSearch}
              />
            )}
            {!isSearchLoading &&
              !searchError &&
              (!searchArticles || searchArticles.length === 0) && (
                <View style={styles.emptyStateContainer}>
                  <Text style={styles.emptyStateText}>No results found</Text>
                  <Feather
                    name="search"
                    size={36}
                    color="#ededed"
                    style={styles.emptyStateIcon}
                  />
                </View>
              )}
            <FlatList
              data={searchArticles}
              keyExtractor={keyExtractor}
              renderItem={renderSearchItem}
              keyboardShouldPersistTaps="handled"
              style={styles.list}
              contentContainerStyle={styles.listContent}
              onEndReached={onEndReachedSearch}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isFetchingNextSearchPage ? <Loading /> : null
              }
            />
          </>
        ) : (
          <FlatList
            data={articles}
            keyExtractor={keyExtractor}
            renderItem={renderHeadlineItem}
            refreshing={isLoading}
            onRefresh={refetch}
            onEndReached={onEndReached}
            onEndReachedThreshold={0.5}
            ListFooterComponent={isFetchingNextPage ? <Loading /> : null}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
            contentContainerStyle={styles.listContent}
          />
        )}
      </View>
    </View>
  );
}
