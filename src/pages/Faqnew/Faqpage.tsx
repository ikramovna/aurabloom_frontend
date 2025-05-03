// import React from 'react';
import { PageContainer } from './layout/PageContainer';
import { FaqSection } from './faq/FaqSection';
import { ContactSection } from './ContactSection';
import { Box } from '@mui/material';

function FaqPage() {
  return (
    <Box sx={{maxWidth:"1440px"}}>
    <PageContainer>
      <FaqSection />
      <ContactSection />
    </PageContainer>
    </Box>
  );
}

export default FaqPage;