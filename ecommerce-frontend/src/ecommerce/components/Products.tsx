import React, { useEffect, useState } from "react";
import {
  TextField,
  Card,
  CardContent,
  Typography,
  Slider,
  Grid,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useHttpClient } from "../hooks/useHttpClient";
import { Product } from "../types";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [productsData, setProductsData] = useState<Product[]>([]);

  const navigate = useNavigate();
  const { fetchProducts } = useHttpClient();


  useEffect(() => {
    fetchProducts()
      .then(res => {
        const data = Array.isArray(res.data) ? res.data : [];
        setProductsData(data);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, []);
  


  const filteredProducts = productsData?.filter((product: Product) => {
    return (
      product.name.toLowerCase().includes(searchText.toLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  const handleProductClick = (id: string) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <Navbar />
      <div style={{ padding: "20px", marginTop: "50px" }}>
        <Typography variant="h4" gutterBottom>
          Product List
        </Typography>

        <Box mb={4}>
          <Grid container spacing={10} alignItems="center">
            <Grid
              item
              xs={12}
              md={6}
              sx={{ pr: { md: 2 }, mb: { xs: 2, md: 0 } }}
            >
              <TextField
                label="Search by Product Name"
                variant="outlined"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Filter by Price Range
              </Typography>
              <Slider
                value={priceRange}
                onChange={(e, newValue) => setPriceRange(newValue as number[])}
                valueLabelDisplay="auto"
                min={0}
                max={1500}
                step={10}
                marks={[
                  { value: 0, label: "$0" },
                  { value: 1500, label: "$1500" },
                ]}
                style={{ width: "90%" }}
              />
            </Grid>
          </Grid>
        </Box>

        <Grid container spacing={2}>
          {" "}
          {Array.isArray(filteredProducts)? filteredProducts.map((product: Product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card
                onClick={() => handleProductClick(product._id)}
                style={{
                  cursor: "pointer",
                  height: "350px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ height: "150px", width: "100%", objectFit: "cover" }}
                />
                <CardContent style={{ flexGrow: 1 }}>
                  <Typography variant="h6" noWrap>
                    {product.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={product.description}
                  >
                    {product.description}
                  </Typography>
                  <Typography variant="h5" color="primary">
                    ${product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )):<></>}
        </Grid>
      </div>
    </>
  );
};

export default Products;
