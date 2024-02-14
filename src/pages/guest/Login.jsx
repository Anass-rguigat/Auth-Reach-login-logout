import React from 'react';
import * as yup from 'yup';
import { Card, CardContent, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useStore } from '../../store/rootStore.tsx';
import { Navigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const schema = yup.object().shape({
  email: yup.string().required('This is required').email('This is an invalid email'),
  password: yup.string().required('This is required').min(4, 'Minimum length should be 4 characters'),
});

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { rootStore: { authStore } } = useStore()
  const isAuthenticated = authStore.isAuthenticated;
  if(isAuthenticated) {
    return <Navigate to="/dashboard/profile"/>
  }
  

  const onSubmit = async (data) => {
    try {
      const resData = await authStore.login({
        email: data.email,
        password: data.password,
      })
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Card sx={{ minWidth: 450, justifyContent: 'center', textAlign: 'center', padding: 2 }}>
        <CardContent>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <h1>LOGIN</h1>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    label="Email"
                    variant="filled"
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : ''}
                    {...field}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <TextField
                    fullWidth
                    type="Password"
                    label="Password"
                    variant="filled"
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : ''}
                    {...field}
                  />
                )}
              />
              <Button sx={{ mt: 3 }} variant="contained" color="primary" type="submit" disabled={isSubmitting}>
                Login
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
export default observer(Login)