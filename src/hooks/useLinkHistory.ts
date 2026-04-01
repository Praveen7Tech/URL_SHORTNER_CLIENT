import { useState, useEffect } from "react";
import { UrlApi, type History } from "../api/urls.api";
let MAX_LIMIT = 2

export const useLinkHistory = () => {
  const [links, setLinks] = useState<History[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLinks = async (pageNumber = page) => {
    try {
      const res = await UrlApi.LinkHistory(pageNumber, MAX_LIMIT);
      setLinks(res.history);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error("Failed to fetch links", err);
    }
  };

  useEffect(() => {
    fetchLinks(page);
  }, [page]);

  return {
    links,
    page,
    setPage,
    totalPages,
    refreshLinks: fetchLinks, // 🔥 important
  };
};