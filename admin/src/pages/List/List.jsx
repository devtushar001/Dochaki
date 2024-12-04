import React, { useEffect, useState } from "react";
import "./List.css";
import { toast } from "react-toastify";

const List = () => {
  const url = "http://localhost:8000";
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchList = async () => {
    try {
      const response = await fetch(`${url}/api/accessory/list`);
      if (!response.ok) {
        // throw new Error(`Error: ${response.message}`);
        toast.error(response.message);
      }
      const result = await response.json();
      toast.success(response.message);
      if (result.success) {
        setList(result.data); // Assuming API sends data in `data`
      } else {
        toast.error(result.message)
        // throw new Error(result.message || "Failed to fetch accessories");
      }
    } catch (err) {
      toast.error("Fetch Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
     
    </>
  )
};

export default List;
