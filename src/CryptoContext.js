import axios from "axios";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { CoinList } from "./config/api";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    meassage: "",
    type: "success",
  });
  const [watchlist, setWatchlist] = useState([]);

  // eslint-disable-next-line no-loop-func
  const fetchCoinsWithRetry = async (currency, maxRetries = 3) => {
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        const { data } = await axios.get(CoinList(currency), {
          timeout: 10000,
        });
        return data;
      } catch (error) {
        const retriesLeft = maxRetries - attempt - 1;
        console.error(`Error fetching coins (${retriesLeft} retries left):`, error.message);

        if (retriesLeft === 0) {
          throw error;
        }

        if (error.response?.status === 429) {
          // Rate limited - wait longer with exponential backoff
          const delayTime = Math.min(1000 * Math.pow(2, attempt), 5000);
          console.log(`Rate limited. Waiting ${delayTime}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delayTime));
        } else {
          // Other errors - wait a bit before retry
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
    }
  };

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user.uid);

      var unsubscribe = onSnapshot(coinRef, coin => {
        if (coin.exists()) {
          console.log(coin.data().coins);
          setWatchlist(coin.data().coins);
        }
        else {
          console.log("No Items in Watchlist!!");
        }
      });
      return () => {
        unsubscribe();
      }
    }
  }, [user])
  

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);

      console.log(user);
    });
  }, []);

  

  const fetchCoins = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCoinsWithRetry(currency);
      console.log(data);
      setCoins(data);
      setAlert({
        open: false,
        message: "",
        type: "success",
      });
    } catch (error) {
      console.error("Error fetching coins:", error);
      setAlert({
        open: true,
        message: "Unable to fetch coins data. Please try again later.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  }, [currency]);

  useEffect(() => {
    fetchCoins();
  }, [fetchCoins]);

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider value={{ currency, setCurrency, symbol, coins,   loading, fetchCoins, alert, setAlert, user, watchlist }}>
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};