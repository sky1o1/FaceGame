import React, { useState, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import firebase from "firebase";
import { createProfile } from '../../services/firebase/profile';
import { setProfile, setImage } from '../../store/profile';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Link,
  TextField,
  Typography,
  makeStyles,
  Input
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // height: '100%',
    paddingBottom: theme.spacing(5),
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));


const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
  image: '',
}


const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email format').required('email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().required('Password is required'),

}
)

function Register() {

  const classes = useStyles();
//   const navigate = useNavigate();

const wrapperRef = useRef(null)
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues,
    onSubmit: async (values, onSubmitProps) => {
        console.log(values)
      try {
        const profileSet = await createProfile(values.email, values.password, values.image)
        dispatch(setProfile(profileSet))
        alert('Successfully added')
        onSubmitProps.setSubmitting(false)
      } catch (error) {
        console.log(error)
      }

    },
    validationSchema,
  })

  return (


      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Card maxWidth="sm">
          <CardContent>
            <Container maxWidth="sm">

              <form
                onSubmit={formik.handleSubmit}
              >
                <Box mb={3}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create your profile
                </Typography>
                </Box>
                <div 
                style={{height: 100, width: 'auto'}}
                onClick={() => wrapperRef.current.click()}  
                >
                    <img style={{height: 100, width: 'auto'}} src='/static/images/plus.jpg' />
                    {
                                formik.initialValues.image &&
                                <img src={formik.values.image} />
                    }
                </div>
                <input
                   fullWidth
                   type="file"
                   name="image"
                   ref={wrapperRef}
                   onChange={(event) => {
                       const selectedFile = event.currentTarget.files[0]
                       const selectedUrl = URL.createObjectURL(selectedFile)
                       formik.setFieldValue("image", selectedUrl);
                       dispatch(setImage(selectedUrl))
                   }}
                   style={{
                       display: 'none'
                   }}
                />
                <TextField
                  error={Boolean(formik.touched.email && formik.errors.email)}
                  fullWidth
                  id="email"
                  helperText={formik.touched.email && formik.errors.email}
                  label="email"
                  margin="normal"
                  name="email"
                  type='email'
                  onBlur={formik.handleBlur}
                  value={formik.values.email}

                  onChange={formik.handleChange}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password "
                  margin="normal"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  variant="outlined"
                />
                 <TextField
                  error={Boolean(formik.touched.confirmPassword && formik.errors.confirmPassword)}
                  fullWidth
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  label="Confirm Password "
                  margin="normal"
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  type="password"
                  variant="outlined"
                />

                <Box my={2}>
                  <Button
                    color="primary"
                    disabled={!formik.isValid || formik.isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Register Profile
                </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                </Link>
                </Typography>
              </form>
            </Container>
          </CardContent>
        </Card>
      </Box>
  )
}

export default Register;
