import { useEffect, useState } from "react";
import { fetchTodos } from "../data/todos";
import { Alert, Badge, Button, Form, Table } from "react-bootstrap";

const Todos = () => {
  // todosRaw -> filters -> todos
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);

  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemPerPage] = useState(10);

  const [numPage, setNumpage] = useState(3);
  const [curPage, setCurPage] = useState(1);

  const [showAlert, setShowAlert] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const toggleTodo = (id) => {
    setTodosRaw((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const Addtodos = () => {
    setShowAlert(true);
  };

  const deleteTodo = (id) => {
    setTodosRaw((prev) => prev.filter((t) => t.id !== id));
  };

  // load
  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []); // fetch todos on load

  useEffect(() => {
    // console.log(todosRaw);
    const filtered = onlyWaiting
      ? todosRaw.filter((t) => !t.completed)
      : todosRaw.slice();
    setTodos(filtered);

    const pages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
    setNumpage(pages);

    setCurPage((prev) => Math.min(prev, pages));
  }, [todosRaw, onlyWaiting, itemsPerPage]);

  useEffect(() => {
    console.log(`onlyWait : ${onlyWaiting}`);
  }, [onlyWaiting]);

  const startIdx = (curPage - 1) * itemsPerPage;
  const visibleTodos = todos.slice(startIdx, startIdx + itemsPerPage);

  return (
    <>
      <div className="mx-5 mt-4">
        {/* filters */}
        <Form>
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2 align-items-center">
              <Form.Check
                type="switch"
                id="custom-switch"
                // label='Show only waiting'
                onChange={(e) => setOnlyWaiting(e.target.checked)}
              />
              Show only
              <Button variant="warning">
                waiting &nbsp; <i className="bi bi-clock"></i>
              </Button>
            </div>
            <Form.Select
              aria-label="Default select example"
              className="w-25"
              value={itemsPerPage}
              onChange={(e) => setItemPerPage(e.target.value)}
            >
              <option value={5}>5 items per page</option>
              <option value={10}>10 items per page</option>
              <option value={50}>50 items per page</option>
              <option value={100}>100 items per page</option>
            </Form.Select>
          </div>
        </Form>

        {/* table */}
        <div className="mt-2">
          <Table bordered hover>
            <thead className="table-dark">
              <tr>
                <th className="text-center" style={{ width: "3rem" }}>
                  ID
                </th>
                <th className="text-center">Title</th>
                <th className="text-end" style={{ width: "12rem" }}>
                  Completed &nbsp;
                  <Button onClick={Addtodos}>
                    <i className="bi bi-plus"></i>
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleTodos.map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td className="text-center">
                      <h5>
                        <Badge bg="secondary">{todo.id}</Badge>
                      </h5>
                    </td>
                    <td>{todo.title}</td>
                    <td className="text-end">
                      {todo.completed ? (
                        <Button
                          variant="success"
                        >
                          done
                        </Button>
                      ) : (
                        <Button
                          variant="warning"
                          onClick={() => toggleTodo(todo.id)}
                        >
                          waiting &nbsp; <i className="bi bi-clock"></i>
                        </Button>
                      )}
                      &nbsp;
                      <Button
                        variant="danger"
                        onClick={() => deleteTodo(todo.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>

        {/* page control */}
        <div className="d-flex gap-2 justify-content-center align-items-center mb-4">
          <Button
            variant="outline-primary"
            onClick={() => setCurPage(1)}
            disabled={curPage <= 1}
          >
            First
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
            disabled={curPage <= 1}
          >
            Previous
          </Button>
          <span>
            {curPage} / {numPage}
          </span>
          <Button
            variant="outline-primary"
            onClick={() => curPage < numPage && setCurPage((p) => p + 1)}
            disabled={curPage >= numPage}
          >
            Next
          </Button>
          <Button
            variant="outline-primary"
            onClick={() => setCurPage(numPage)}
            disabled={curPage >= numPage}
          >
            Last
          </Button>
        </div>
      </div>

      {showAlert && (
        <Alert
          variant="light"
          onClose={() => setShowAlert(false)}
          // dismissible
          className="position-fixed top-50 start-50 translate-middle shadow text-start"
          style={{
            zIndex: 9999,
            width: "400px",
            textAlign: "center",
          }}
        >
          <Alert.Heading className="d-flex justify-content-between">
            <div>
              <span>
                <i className="bi bi-plus-circle me-2"></i>Add Todo
              </span>
            </div>
            <div>
              <Button variant="" size="sm" onClick={() => setShowAlert(false)}>
                <i className="bi bi-x-lg"></i>
              </Button>
            </div>
          </Alert.Heading>
          <hr />
          <p className="text-start">
            ID : <Badge bg="secondary">{todosRaw.length + 1}</Badge>
          </p>
          <Badge bg="secondary">{todos.id}</Badge>
          <Form>
            <Form.Group>
              <Form.Label>Title :</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="typing your todo title here..."
                onChange={(e) => setNewTitle(e.target.value)}
              />
            </Form.Group>
          </Form>
          <hr />
          <div className="d-flex gap-2 justify-content-end">
            <Button variant="secondary" onClick={() => setShowAlert(false)}>
              Close
            </Button>
            <Button
              variant="primary"
              disabled={!newTitle.trim()}
              onClick={() => {
                setTodosRaw([
                  ...todosRaw,
                  {
                    id: todosRaw.length + 1,
                    title: newTitle,
                    completed: false,
                  },
                ]);
                setShowAlert(false);
                setNewTitle("");
              }}
            >
              Save
            </Button>
          </div>
        </Alert>
      )}
    </>
  );
};

export default Todos;
