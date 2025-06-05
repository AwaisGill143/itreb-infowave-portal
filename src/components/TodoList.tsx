
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { useTodos } from "@/hooks/useTodos";

const TodoList = () => {
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodos();
  const [newTodo, setNewTodo] = useState("");

  const handleAddTodo = async () => {
    if (newTodo.trim()) {
      await addTodo(newTodo);
      setNewTodo("");
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    await updateTodo(id, { completed: !completed });
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
  };

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>To-Do List</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-gray-500">Loading todos...</div>
          ) : (
            <>
              {todos.map((todo) => (
                <div key={todo.id} className="flex items-center justify-between bg-gray-100 p-3 rounded group">
                  <div className="flex items-center space-x-2 flex-1">
                    <Checkbox
                      checked={todo.completed}
                      onCheckedChange={() => handleToggleComplete(todo.id, todo.completed)}
                    />
                    <span className={`text-sm flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                      {todo.content}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </div>
              ))}
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add new todo..."
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTodo()}
                  className="text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleAddTodo}
                  className="bg-religious-600 hover:bg-religious-700 shrink-0"
                  disabled={!newTodo.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TodoList;
