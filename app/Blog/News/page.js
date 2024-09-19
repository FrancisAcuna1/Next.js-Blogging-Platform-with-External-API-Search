"use client"
import * as React from 'react';
import { useState, useEffect } from 'react';
import { theme, createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { Container, Divider } from '@mui/material';

import dynamic from 'next/dynamic';
const NewsComponent = dynamic(() => import('../../Component/NewsComponent'), {
  ssr: false
  }) 

// import NewsComponent from '@/app/Component/NewsComponent';


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}


export default function NewsPage(){
    const [mobileOpen, setMobileOpen] = React.useState(false);
    // this code 'isSmUp is Enable the Burger Icon for mobile view
    //  const isSmUp = useMediaQuery(theme.breakpoints.up( 'lg',));

    return (

     
        <Box  sx={{ display: 'flex', minHeight: '100vh' }}>
            <CssBaseline />
            <Container maxWidth="xl" sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            
              <Box component="main" sx={{ flex: 1, py: 2, px: 3, }}>
                <NewsComponent/>
                
                
            </Box>
       
            
           
            <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1', mt:2, mb:2 }}>
                <Copyright/>
            </Box>
            
            </Container>
        </Box>
      
        
    )
}