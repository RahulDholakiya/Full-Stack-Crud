/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/users/showUser/${id}`)
      .then((result) => {
        const userData = result.data.data;
        setName(userData.name);
        setEmail(userData.email);
        setPassword(userData.password);
        setAge(userData.age);
        console.log("Update Result", result);
      })
      .catch((err) => {
        console.log("Update Error", err);
      });
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/api/users/updateUser/${id}`, {
        name,
        email,
        password,
        age,
      })
      .then((result) => {
        console.log("Update User Page Result", result);
        navigate("/");
      })
      .catch((err) => {
        console.log("Update User Page Error", err);
      });
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6">Update User</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Name"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              value={email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              value={password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              fullWidth
              label="Age"
              name="age"
              type="number"
              onChange={(e) => setAge(e.target.value)}
              required
              value={age}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UpdateUser;
