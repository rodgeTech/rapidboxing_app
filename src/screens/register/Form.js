import React from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {Icon, Input, Button, Text} from 'react-native-ui-kitten';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
});

export default (Form = ({onRegister}) => (
  <Formik
    validationSchema={validationSchema}
    initialValues={{name: '', email: '', password: ''}}
    onSubmit={(values, {setSubmitting, setStatus, resetForm}) =>
      onRegister(values, setStatus, setSubmitting, resetForm)
    }>
    {({
      handleChange,
      handleBlur,
      handleSubmit,
      values,
      errors,
      touched,
      isSubmitting,
      status,
    }) => (
      <React.Fragment>
        {status && status.error && (
          <Text status="danger" style={{marginBottom: 20}}>
            {status.error}
          </Text>
        )}
        <Input
          value={values.name}
          icon={() => <Icon name="person-outline" fill="#C5CEE0" />}
          placeholder="Name"
          onChangeText={handleChange('name')}
          onBlur={handleBlur('name')}
          style={{marginBottom: 10}}
          caption={errors.name && touched.name && errors.name}
          status={touched.name && errors.name && 'danger'}
        />
        <Input
          value={values.email}
          placeholder="Email"
          icon={() => <Icon name="email-outline" fill="#C5CEE0" />}
          onChangeText={handleChange('email')}
          onBlur={handleBlur('email')}
          style={{marginBottom: 10}}
          caption={errors.email && touched.email && errors.email}
          status={touched.email && errors.email && 'danger'}
          keyboardType="email-address"
          autoCompleteType="email"
          autoCapitalize="none"
        />
        <Input
          value={values.password}
          placeholder="Password"
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          style={{marginBottom: 10}}
          caption={errors.password && touched.password && errors.password}
          status={touched.password && errors.password && 'danger'}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button
          status="success"
          size="large"
          style={{width: '100%', marginTop: 10, marginBottom: 20}}
          onPress={handleSubmit}
          disabled={isSubmitting}>
          {isSubmitting ? 'Creating your account...' : 'Register'}
        </Button>
      </React.Fragment>
    )}
  </Formik>
));
