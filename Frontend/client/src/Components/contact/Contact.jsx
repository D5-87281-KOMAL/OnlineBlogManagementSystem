import { Box, styled, Typography, Link } from '@mui/material';
import { GitHub, Instagram, Email } from '@mui/icons-material';
import Header from '../header/Header';

const Banner = styled(Box)`
    background-image: url(http://mrtaba.ir/image/bg2.jpg);
    width: 100%;
    height: 50vh;
    background-position: left 0px top -100px;
    background-size: cover;
`;

const Wrapper = styled(Box)`
    padding: 20px;
    & > h3, & > h5 {
        margin-top: 50px;
    }
`;

const Text = styled(Typography)`
    color: #878787;
`;


const Contact = () => {
    return (
        <Box>
            <Header/>
            <Banner />
            <Wrapper>
                <Typography variant="h2">Getting in touch is easy!</Typography><br/> 
                <Typography variant='h4'>Feel free to reach out to us for any inquiries, feedback, or support. We’d love to hear from you!</Typography>
                <Typography variant="h5" align='center'>
                Contact Us
                    Have questions or need assistance? We're here to help!<br/>

                    📧 Email: support@skms@.com<br/>
                    📞 Phone: +1 7563746356<br/>
                    🌐 Website: https://localhost:8000<br/>
                    📍 Address: Hinjewadi, Phase 2, Near Power House,pune
                </Typography>
                <Text variant="h5" align='center'>
                    <br/>
                    Reach out to me on Instagram
                    <Link href="https://www.instagram.com/vsairameshbabu/" color="inherit" target="_blank">
                        <Instagram/>
                    </Link>
                    <br/>
                    or send me an Email 
                    <Link href="mailto:sairameshbabuv@gmail.com.com?Subject=This is a subject" target="_blank" color="inherit">
                        <Email />
                    </Link>.
                </Text>
            </Wrapper>
        </Box>
    );
}

export default Contact;