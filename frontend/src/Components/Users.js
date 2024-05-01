import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

const Users = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users/showUser")
      .then((result) => {
        setUser(result.data.data);
        console.log("Table Page Result", result);
      })
      .catch((err) => {
        console.log("Table Page Error", err);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:4000/api/users/deleteUser/${id}`)
      .then((result) => {
        console.log("Delete Result", result);
        window.location.reload();
      })
      .catch((err) => {
        console.log("delete Page Error", err);
      });
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Link to="/create">
          <Button variant="contained" color="primary">
            Add User
          </Button>
        </Link>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((item, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item?.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.password}</TableCell>
                <TableCell>{item.age}</TableCell>
                <TableCell>
                  {" "}
                  <Link to={`/update/${item._id}`}>
                    <Button variant="contained" color="success">
                      Edit
                    </Button>
                  </Link>
                </TableCell>
                <TableCell>
                  {" "}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
