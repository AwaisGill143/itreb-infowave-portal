
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempted with:", { email, password });
    // Add login logic here - for now, just redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Logo */}
      <div className="flex-1 bg-gradient-to-br from-religious-600 to-religious-800 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-32 h-32 bg-white bg-opacity-20 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center">
              <span className="text-3xl font-bold text-religious-800">I</span>
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-2">ITREB</h1>
          <p className="text-religious-200 text-lg">Welcome back to our community</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 bg-white flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-religious-800 mb-2">Sign In</h2>
              <p className="text-gray-600">Enter your credentials to access your account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-religious-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-religious-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-gray-300 focus:border-religious-500 focus:ring-religious-500"
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-religious-600 hover:bg-religious-700 text-white py-3"
              >
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{" "}
                <button 
                  onClick={() => navigate('/join')}
                  className="text-religious-600 hover:text-religious-700 font-medium"
                >
                  Join ITREB
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
