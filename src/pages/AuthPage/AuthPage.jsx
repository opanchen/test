import { LoginForm } from 'components/LoginForm';
import { RegisterForm } from 'components/RegisterForm';
import { Link, Outlet, useNavigation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';

const TabPanel = props => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  //   value: PropTypes.number.isRequired,
};

export const AuthPage = () => {
  //   const navigation = useNavigation();

  const { id } = useParams();

  useEffect(() => {
    id === 'register' ? setValue(0) : setValue(1);
  }, [id]);

  const [value, setValue] = useState(0);

  const handleChange = (e, newValue) => {
    setValue(newValue);
    // newValue === 0
    //   ? navigation.navigate('/auth/register')
    //   : navigation.navigate('/auth/login');
  };

  return (
    <Box
      sx={{
        bgcolor: '#151515',
        // width: '100%',
        padding: 6,
      }}
    >
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{
            // hidden: true,
            sx: { display: 'none' },
          }}
          sx={{
            // '& div.MuiTabs-flexContainer': { justifyContent: 'space-between' },
            '& button': { color: 'rgba(255, 255, 255, 0.30)' },
            '& button.Mui-selected': { color: '#FFF' },
          }}
        >
          {/* <Tab label="Registration" />
          <Tab label="Log in" /> */}
          <Tab label="Registration">
            <Link to="/auth/register" />
          </Tab>
          <Tab label="Log in">
            <Link to="/auth/login" />
          </Tab>
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <RegisterForm />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LoginForm />
      </TabPanel>
    </Box>
  );
};
