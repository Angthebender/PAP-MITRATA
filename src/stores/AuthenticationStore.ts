import { defineStore } from 'pinia';
import { supabase } from 'boot/supabase';

export const useAuthenticationstore = defineStore('counter', {
  state: () => ({
    email: '',
    password: '',
    error: '',
    username: '',
    dob: null,
    LoginError: false,
    loginSuccess: false,
  }),
  actions: {
    async handleSubmit() {
      // Reset error message before proceeding
      this.error = '';
      this.loginSuccess = false;
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: this.email,
          password: this.password,
        });

        if (error) {
          if (error.message === 'Invalid login credentials') {
            console.log('invalid credentials');
            this.LoginError = true;
          } else {
            // Handle other errors if needed
            console.error('Supabase error:', error);
          }
        } else {
          // Login successful
          this.LoginError = false;
          this.loginSuccess = true;
          console.log('valid credentials');
          console.log('Logged in user:', data);
        }
      } catch (err) {
        console.error('An unexpected error occurred:', err);
        this.error = 'An unexpected error occurred'; // Handle additional error messages if needed
      }
    },

    async CreateAccount() {
      console.log('submitting...');
      this.error = ''; // Reset error message

      if (!this.email || !this.username || !this.password || !this.dob) {
        this.error = 'All fields are required'; // Error message for missing fields
        console.log('dont leave the fileds empty');
        return; // Exit the function if any required field is missing
      }

      try {
        const { data, error } = await supabase.auth.signUp({
          email: this.email,
          password: this.password,
          options: {
            data: {
              username: this.username,
              dob: this.dob,
            },
          },
        });

        if (error) {
          this.error = error.message; // Store the error message
          console.error('Sign-up error:', error.message);
        } else {
          console.log('Sign-up successful:', data);
          const { error } = await supabase.from('profiles').insert({
            id: data.user?.id,
            username: this.username,
            email: this.email,
          });
          // Optionally, you can trigger additional actions here
          if (error) {
            this.error = error.message; // Store the error message
            console.error('Inserting profile error:', error.message);
          } else {
            console.log('inserted into the profiles table');
          }
        }
      } catch (err) {
        this.error = 'An unexpected error occurred'; // Generic error message
        console.error('Unexpected error:', err);
      }
    },
  },
});
