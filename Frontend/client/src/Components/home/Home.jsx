
import { Grid } from '@mui/material';

//components
import Banner from '../banner/Banner';
import Categories from './Categories1';
import Posts from './post/Posts';
import Header from '../header/Header';
import Footer from './Footer'; // Adjust the import path based on your file structure

const Home = () => {

    return (
        <>
        <Header />
        <Banner />
        <Grid container>
          <Grid item lg={2} xs={12} sm={2}>
            <Categories />
          </Grid>
          <Grid container item xs={12} sm={10} lg={10}>
            <Posts />
          </Grid>
        </Grid>
        <Footer /> {/* Add the Footer here */}
      </>
    )
}

export default Home;

