import Views from "../../interfaces/Views";
import { StyledHeader, StyledLi, StyledUl } from "./Header.style";

type PropTypes = {
  toggleTab: (tab: Views) => void;
};
const Header = ({ toggleTab }: PropTypes) => (
  <StyledHeader>
    <h1>Wet Paddlers V2</h1>
    <nav>
      <StyledUl>
        {Object.values(Views).map((view) => (
          <StyledLi onClick={toggleTab.bind(this, Views[view])}>
            {view}
          </StyledLi>
        ))}
      </StyledUl>
    </nav>
  </StyledHeader>
);

export default Header;
