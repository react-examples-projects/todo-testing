import React from "react";
import App, { Todo, TodoForm, useTodos } from "../App";
import { shallow, mount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Todo Component", () => {
  it("Ejecutar completeTodo cuando se clickea", () => {
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();
    const index = 5;
    const todo = {
      isCompleted: true,
      text: "lala",
    };

    const wrapper = shallow(
      <Todo
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        index={index}
        todo={todo}
      />
    );

    wrapper.find("button").at(0).simulate("click");

    expect(completeTodo.mock.calls).toEqual([[5]]);
    expect(removeTodo.mock.calls).toEqual([]);
  });

  it("Ejecutar removeTodo cuando clickeo X", () => {
    const completeTodo = jest.fn();
    const removeTodo = jest.fn();
    const index = 5;
    const todo = {
      isCompleted: true,
      text: "lala",
    };

    const wrapper = shallow(
      <Todo
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        index={index}
        todo={todo}
      />
    );

    wrapper.find("button").at(1).simulate("click");

    expect(removeTodo.mock.calls).toEqual([[5]]);
    expect(completeTodo.mock.calls).toEqual([]);
  });
});

describe("Todo Form component", () => {
  it("Llamar addTodo cuando se envia el form con valores", () => {
    const addTodo = jest.fn();
    const wrapper = shallow(<TodoForm addTodo={addTodo} />);
    const preventDefault = jest.fn();
    // primer simular el relleno de los campos del form

    // simulate toma otro parametro que es el valor del event
    wrapper.find("input").simulate("change", {
      target: {
        value: "mi nuevo todo",
      },
    });

    // luego enviar el form
    wrapper.find("form").simulate("submit", {
      preventDefault,
    });

    expect(addTodo.mock.calls).toEqual([["mi nuevo todo"]]);
    expect(preventDefault.mock.calls).toEqual([[]]);
  });
});

describe("custom-hook useTodos", () => {
  const TestComponent = (props) => {
    const hook = props.hook();

    return <div {...hook} />;
  };

  it("funcion addTodo", () => {
    const wrapper = shallow(<TestComponent hook={useTodos} />);
    let props = wrapper.find("div").props();
    props.addTodo("Un todo nuevo");
    props = wrapper.find("div").props();
    expect(props.todos[0]).toEqual({ text: "Un todo nuevo" });
  });

  it("funcion removeTodo", () => {
    const wrapper = shallow(<TestComponent hook={useTodos} />);
    let props = wrapper.find("div").props();
    props.removeTodo(0);
    props = wrapper.find("div").props();
    // el 0 deberia ser el segundo, ya que el 0 lo elimine
    expect(props.todos).toEqual([
      {
        text: "Todo 2",
        isCompleted: false,
      },
      {
        text: "Todo 3",
        isCompleted: false,
      },
    ]);
  });

  it("funcion completeTodo", () => {
    const wrapper = shallow(<TestComponent hook={useTodos} />);
    let props = wrapper.find("div").props();
    props.completeTodo(0);
    props = wrapper.find("div").props();
    // el 0 deberia ser el segundo, ya que el 0 lo elimine
    expect(props.todos[0]).toEqual({ text: "Todo 1", isCompleted: true });
  });
});

describe("App", () => {
  it("App component Todo form", () => {
    const wrapper = mount(<App />);
    const preventDefault = jest.fn();

    wrapper.find("input").simulate("change", {
      target: {
        value: "Mi todo",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault,
    });

    const result = wrapper.find(".todo").at(0).text().includes("Mi todo");
    expect(result).toEqual(true);
    expect(preventDefault.mock.calls).toEqual([[]]);
  });
});
