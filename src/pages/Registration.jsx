import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useLocation } from 'wouter';

const RegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

export default function Registration() {
  const [, setLocation] = useLocation();
  const [submitError, setSubmitError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(data.message || 'Account created successfully!');
        setSubmitError('');
        resetForm();
        // Redirect to login after successful registration
        setTimeout(() => {
          setLocation('/login');
        }, 2000);
      } else {
        setSubmitError(data.message || 'Registration failed');
        setSuccessMessage('');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.');
      setSuccessMessage('');
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Create Account</h3>
            </div>
            <div className="card-body">
              {submitError && (
                <div className="alert alert-danger">{submitError}</div>
              )}
              {successMessage && (
                <div className="alert alert-success">{successMessage}</div>
              )}
              <Formik
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={RegistrationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
                    <div className="mb-3">
                      <label htmlFor="firstName" className="form-label">First Name</label>
                      <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                        id="firstName"
                      />
                      <ErrorMessage name="firstName" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="lastName" className="form-label">Last Name</label>
                      <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                        id="lastName"
                      />
                      <ErrorMessage name="lastName" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                        id="email"
                      />
                      <ErrorMessage name="email" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">Password</label>
                      <Field
                        type="password"
                        name="password"
                        className="form-control"
                        id="password"
                      />
                      <ErrorMessage name="password" component="div" className="text-danger small" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                      <Field
                        type="password"
                        name="confirmPassword"
                        className="form-control"
                        id="confirmPassword"
                      />
                      <ErrorMessage name="confirmPassword" component="div" className="text-danger small" />
                    </div>

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Creating Account...' : 'Register'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-3 text-center">
                <small>Already have an account? <a href="/login">Login here</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}