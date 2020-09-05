import { useEffect, useState } from "react";
import axios from "axios";

export default function useQuestionSearch(pagenumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [question, setQuestions] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    const search = async () => {
      try {
        const res = await axios.get(
          "https://api.stackexchange.com/2.2/questions",
          {
            params: {
              page: pagenumber,
              pageSize: "50",
              order: "desc",
              sort: "activity",
              filter: "default",
              site: "stackoverflow",
            },
          }
        );

        setQuestions((prevQuestions) => {
          return [
            ...new Set([
              ...prevQuestions,
              ...res.data.items
            ]),
          ];
        });
        setHasMore(res.data.has_more);
        setLoading(false);
        console.log(res.data.items);
      } catch (e) {
        setError(true);
      }
    };
    search();
  }, [pagenumber]);
    return { loading, error, question, hasMore };
}
