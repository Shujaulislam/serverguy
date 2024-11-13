// src/components/Navbar.js
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  Button,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch } from "react-redux";
import { setQuery, fetchContent, setCurrentPage } from "../redux/contentSlice";
import SearchOutlined from "@mui/icons-material/SearchOutlined";

function Navbar() {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    dispatch(setCurrentPage(0));
    dispatch(setQuery(searchText));
    dispatch(fetchContent({ query: searchText, page: 0 }));
  };
  
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userName = users.length > 0 ? users[0].name : null;
  // alert(userName);


  return (
    <nav className="bg-orange-500 py-3 px-2 static">
      {/* <Toolbar style={{ backgroundColor: '#FF742B' }}> */}
      <div className="grid grid-cols-12 ">
        <div className="col-span-2">{userName}</div>
        <div className="col-span-9">
          <div class="w-full">
            <div class="relative flex items-center">
              <SearchOutlined className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />
              <input
                class="w-full bg-white placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                placeholder="UI Kits, Dashboards..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          <Button>
            <SettingsOutlinedIcon style={{ color: "black" }} />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
