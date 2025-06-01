
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Download, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState("");

  // Mock board member data - in real app this would come from authentication
  const boardMember = {
    name: "John Doe",
    portfolio: "Technology"
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, newTodo.trim()]);
      setNewTodo("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleViewApplicants = () => {
    // In real app, this would generate and download Excel with portfolio-specific data
    console.log(`Downloading applicants for ${boardMember.portfolio} portfolio`);
    alert(`Downloading applicants for ${boardMember.portfolio} portfolio`);
  };

  const handleResourceLibrary = () => {
    // In real app, this would download the actual PDF
    console.log("Downloading resource library PDF");
    alert("Downloading resource library PDF");
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-religious-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="ml-2 text-xl font-bold text-religious-800">ITREB</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button 
                onClick={() => navigate("/create-opportunity")}
                className="bg-religious-600 hover:bg-religious-700"
              >
                Create Opportunity
              </Button>
              <Button 
                onClick={handleViewApplicants}
                variant="outline"
                className="border-religious-600 text-religious-600 hover:bg-religious-50"
              >
                <Download className="w-4 h-4 mr-2" />
                View Applicants
              </Button>
              <Button 
                onClick={handleResourceLibrary}
                variant="outline"
                className="border-religious-600 text-religious-600 hover:bg-religious-50"
              >
                Resource Library
              </Button>
              <Button 
                onClick={handleLogout}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Hello {boardMember.name}!
          </h1>
          <p className="text-gray-600 mt-1">{boardMember.portfolio} Portfolio</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border w-full"
                />
                
                {/* Event Actions */}
                <div className="flex gap-4 mt-6">
                  <Button 
                    onClick={() => navigate("/add-event")}
                    className="bg-religious-600 hover:bg-religious-700"
                  >
                    Add Event
                  </Button>
                  <Button variant="outline">
                    Remove Event
                  </Button>
                  <Button variant="outline">
                    Add Images
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Todo List Section */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>To-Do List</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {todos.map((todo, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded">
                      <span className="text-sm">{todo}</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeTodo(index)}
                        className="h-6 w-6 p-0"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add new todo..."
                      value={newTodo}
                      onChange={(e) => setNewTodo(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                      className="text-sm"
                    />
                    <Button
                      size="sm"
                      onClick={addTodo}
                      className="bg-religious-600 hover:bg-religious-700 shrink-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
