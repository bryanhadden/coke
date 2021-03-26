import { useSelector, useDispatch } from "react-redux";
import { assign, loadIngredients, selected, unassign } from "./store";
import styled from "styled-components";

function App() {
  const ingredients = useSelector((state) => state.ingredients);
  const slots = useSelector((state) => state.slots);
  const activeIngredientId = useSelector((state) => state.activeIngredientId);
  const dispatch = useDispatch();

  return (
    <Wrapper className="App">
      <Column className="ingredients" wrap>
        <div className="ingredients-inner">
          {ingredients.map((ingredient) => (
            <MyButton
              key={Math.random()}
              selected={ingredient?.id === activeIngredientId}
              onClick={() => dispatch(selected(ingredient?.id))}
            >
              {ingredient.name}
            </MyButton>
          ))}
        </div>
      </Column>
      <Column className="slots-inner">
        {slots.map((slot) => (
          <Card key={Math.random()}>
            <span>{slot?.slotId}</span>
            <span>{slot?.ingredient || "unassigned"}</span>
            {
              <Action
                onClick={() =>
                  dispatch(slot.ingredient ? unassign(slot) : assign(slot))
                }
              >
                {slot.ingredient ? "X" : "Assign"}
              </Action>
            }
          </Card>
        ))}
      </Column>
    </Wrapper>
  );
}

export default App;

const Action = styled.button`
  border-radius: 25px;
  margin-left: 5px;
  padding: 8px 10px;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  border: none;
  background-color: palevioletred;
  color: white;
  font-weight: 600;
  min-width: 10vw;
`;

const MyButton = styled.button`
  background-color: #fff;
  height: 100px;
  border-radius: 50%;
  border: 1.25px solid gray;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  width: 100px;
  cursor: pointer;
  margin: 5px;
  position: relative;
  font-size: .2em;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  outline: none;
  white-space: pre-line;

  &:before {
    content: "";
    z-index: -1;
    content: "";
    display: inline-block;
    -moz-border-radius: 7.5px;
    -webkit-border-radius: 7.5px;
    border-radius: 50%;
    position: absolute;
    top: -4px;
    left: -4px;
    width: 102px;
    height: 102px;
    border: ${(props) =>
      `2px solid ${props.selected && "palevioletred !important"}`};
  }
`;

const Card = styled.div`
  background-color: rgba(128, 128, 128, 0.15);
  border-radius: 5px;
  padding: 10px 10px;
  margin: 5px 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 300px;
  width: 40vw;
  span:first-child {
    margin-right: 15px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  align-items: ${(props) => !props.wrap && "center"};
  justify-content: ${(props) => props.wrap && "center"};
  flex-flow: ${(props) => props.wrap && "wrap"};
  margin-top: ${(props) => !props.wrap ? "1vh" : "2vh"};
  width: 100%;

  .ingredients-inner {
    padding: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
    height: 110px;
    white-space: nowrap;
  }

  .slots-inner {
    overflow-x: hidden;
    overflow-y: scroll;
    height: 50vh;
    white-space: nowrap;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;
