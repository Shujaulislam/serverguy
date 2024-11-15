import React, { useState } from "react";
import { Button } from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import { useDispatch } from "react-redux";
import { setQuery, fetchContent, setCurrentPage } from "../redux/contentSlice";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { AccountCircleOutlined, Home, LogoutOutlined, PersonOffOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; 
import { useAuth } from "../context/AuthContext"; 



function Navbar() {
  const dispatch = useDispatch();
  const { logout } = useAuth(); //  logout from the AuthContext
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate for routing

  const handleSearch = () => {
    dispatch(setCurrentPage(0));
    dispatch(setQuery(searchText));
    dispatch(fetchContent({ query: searchText, page: 0 }));
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); 
  };

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const userName = users.length > 0 ? users[0].name : null;
  const userEmail = users.length > 0 ? users[0].email : null;

  return (
    <nav className="bg-orange-500 py-3 px-2 static">
      <div className="grid grid-cols-12">
        <div className="col-span-2 flex items-center space-x-3">
              <Button onClick={() => {
                dispatch(setCurrentPage(0))
                dispatch(setQuery(""))
                dispatch(fetchContent({ query: "", page: 0 }))
                navigate("/")
              }}><Home className="text-black" /></Button>
                    <AccountCircleOutlined className="text-black" />
          <div className="text-black">
            <div>{userName}</div>
            <div className="text-sm text-slate-600">{userEmail}</div>
          </div>
        </div>
        <div className="col-span-9">
          <div className="w-full">
            <div className="relative flex items-center">
              <SearchOutlined className="absolute w-5 h-5 top-2.5 left-2.5 text-slate-600" />
              <input
                className="w-full bg-white placeholder:text-slate-400 text-slate-700 pl-10 pr-3 py-2 
                transition duration-300 ease focus:outline-none focus:border-slate-400
                hover:border-slate-300 shadow-sm focus:shadow text-[15px]"
                placeholder="UI Kits, Dashboards..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
          </div>
        </div>
        <div className="col-span-1 flex justify-end">
          <Button onClick={handleLogout}>
            <PersonOffOutlined className="text-black"/>
          </Button>
          <Button>
            <SettingsOutlinedIcon style={{ color: "black" }} />
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
