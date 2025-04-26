import { SignUp } from '@clerk/nextjs';

const SignUpPage = () => {
  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-4">
        <SignUp 
          appearance={{
            elements: {
              formButtonPrimary: 'bg-primary hover:bg-primary/90',
              footerActionLink: 'text-primary hover:text-primary/90'
            }
          }}
        />
      </div>
    </div>
  );
};

export default SignUpPage; 