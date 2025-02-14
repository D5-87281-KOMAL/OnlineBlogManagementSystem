import { Button, Box, Typography, Card, CardContent, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

const StyledButton = styled(Button)`
    margin: 20px;
    width: 85%;
    background: #6495ED;
    color: #fff;
    text-decoration: none;
`;

// const StyledLink = styled(Link)`
//     text-decoration: none;
//     color: inherit;
// `;

// Hardcoded advertisements data
const advertisements = [
  {
    id: 1,
    title: 'Get 50% Off on Hosting Plans!',
    description: 'Limited time offer on our premium hosting plans. Use code HOST50 at checkout.',
    link: 'https://www.godaddy.com/en-in/offers/hosting?isc=inhosgon1&countryview=1&currencyType=INR&cdtl=c_17633009659.g_133541905650.k_kwd-10010321.a_669121581578.d_c.ctv_g&bnb=nb&gad_source=1&gclid=Cj0KCQiA4-y8BhC3ARIsAHmjC_FLIyEJZ1kc9vJpbscdg7Ry-Cfy3QDVeEx73gK5OllI2dR_0uX824gaAjWlEALw_wcB://example.com/hosting-deal',
  },
  {
    id: 2,
    title: 'Free SEO Consultation',
    description: 'Book a free consultation with our SEO experts and boost your website traffic.',
    link: 'https://example.https://www.adogy.com/free-seo-consultation//seo-consultation',
  },
  {
    id: 3,
    title: 'Advertise Here for Free!',
    description: 'Promote your business or service to thousands of users. Contact us for details.',
    link: 'https://example.com/https://clevertap.com/ppc/customer_engagement/?utm_medium=ppc&utm_source=google&utm_term=increase%20customer%20engagement&utm_campaign=META_EN_Customer-Engagement-Retention-Search_LG&hsa_acc=6435276240&hsa_cam=21975123356&hsa_grp=171122666629&hsa_ad=729994665985&hsa_src=g&hsa_tgt=kwd-303569478918&hsa_kw=increase%20customer%20engagement&hsa_mt=p&hsa_net=adwords&hsa_ver=3&gad_source=1&gclid=Cj0KCQiA4-y8BhC3ARIsAHmjC_EZ50XGcdl3rlJ2fol63fQzeRZuGNVCtz9C0x_nav4AFBJFUb-gsxsaAqiQEALw_wcB',
  },
];

const Categories1 = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      {/* <Link to={`/create?category=${category || ''}`} style={{ textDecoration: 'none' }}>
        <StyledButton variant="contained">Create Blog</StyledButton>
      </Link> */}

      <Box sx={{ margin: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Free Advertisements
        </Typography>
        {advertisements.map((ad) => (
          <Card key={ad.id} sx={{ marginBottom: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {ad.title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {ad.description}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                href={ad.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
};

export default Categories1;