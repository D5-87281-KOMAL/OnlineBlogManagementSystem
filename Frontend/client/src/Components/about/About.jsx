import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import Header from '../header/Header';

const Banner = styled(Box)(({ theme }) => ({
    backgroundImage: 'url(https://www.wallpapertip.com/wmimgs/23-236943_us-wallpaper-for-website.jpg)',
    width: '100%',
    height: '50vh',
    backgroundPosition: 'left 0px bottom 0px',
    backgroundSize: 'cover',
    [theme.breakpoints.down('sm')]: {
        height: '30vh',
    },
}));

const Wrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(3),
    '& > h3, & > h5': {
        marginTop: theme.spacing(6),
    },
    [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(2),
    },
}));

const Text = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
}));

const About = () => {
    return (
        <Box>
            <Header />
            <Banner />
            <Wrapper>
                <Typography variant="h3">About us</Typography><br/>
                <Typography variant="h5">Welcome to SMKS Blogs, your all-in-one platform for seamless blog management! Whether you're an individual blogger, a content creator, or a business looking to establish a strong online presence, our system is designed to make blogging effortless.

With an intuitive interface, powerful content management features, and seamless integration options, we help you create, organize, and publish high-quality content with ease. Our mission is to empower writers and businesses by providing a hassle-free platform to manage and grow their blogs efficiently.

Join us today and take your blogging experience to the next level!</Typography><br/>
                <Text variant="h5">
                    I'm a Software Engineer based in India.
                    I've built websites, desktop applications, and corporate software.<br />
                    If you are interested, you can view some of my favorite projects here
                    <Box component="span" ml={1}>
                        <Link href="https://github.com/Ramesh1920" color="inherit" target="_blank">
                            <GitHub />
                        </Link>
                    </Box>
                </Text>
                <Text variant="h5">
                    Need something built or simply want to have a chat? <br />
                    Reach out to me on
                    <Box component="span" ml={1}>
                        <Link href="https://www.instagram.com/vsairameshbabu/" color="inherit" target="_blank">
                            <Instagram />
                        </Link>
                    </Box>
                    <br />
                    or send me an Email 
                    <Link href="mailto:sairameshbabuv@gmail.com?Subject=This%20is%20a%20subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
};

export default About;
