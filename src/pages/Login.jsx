import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { useLocation } from 'wouter';

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

export default function Login() {
  const [, setLocation] = useLocation();
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store user session/token (for now, just redirect)
        localStorage.setItem('user', JSON.stringify(data.user));
        setLocation('/');
      } else {
        setSubmitError(data.message || 'Login failed');
      }
    } catch (error) {
      setSubmitError('Network error. Please try again.');
    }
    setSubmitting(false);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center">Login to Daily Dose</h3>
            </div>
            <div className="card-body">
              {submitError && (
                <div className="alert alert-danger">{submitError}</div>
              )}
              <Formik
                initialValues={{
                  email: '',
                  password: '',
                }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting }) => (
                  <Form>
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

                    <div className="d-grid">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? 'Logging in...' : 'Login'}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
              <div className="mt-3 text-center">
                <small>Don't have an account? <a href="/registration">Register here</a></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}