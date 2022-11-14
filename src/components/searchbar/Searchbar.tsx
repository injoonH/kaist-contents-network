import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import styled from "styled-components";
import { colors } from "@/theme";

const containerPadding = "1.2rem";

const Container = styled.div`
  position: absolute;
  top: 3rem;

  overflow: hidden;

  border: 1px solid ${colors.gray_300};
  border-radius: ${containerPadding};
  width: clamp(30rem, 25%, 50rem);

  color: ${(props) => props.theme.background_text};
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  padding: ${containerPadding};

  & > svg {
    font-size: 2rem;
  }
`;

const Input = styled.input`
  flex: 1;

  font-size: 1.8rem;
  color: ${(props) => props.theme.background_text};
`;

const EntryList = styled.ul`
  padding: ${containerPadding} 0;
`;

const Entry = styled.li`
  list-style: none;

  padding: 0.8rem ${containerPadding};

  cursor: default;

  color: ${(props) => props.theme.background_text};

  &:hover {
    background-color: ${colors.gray_850};
  }
`;

const Divider = styled.hr`
  margin: 0 1rem;
  border: none;
  height: 1px;

  background-color: ${colors.gray_600};
`;

export const Searchbar: React.FC<{
  ideas: Array<{ id: number; title: string }>;
}> = ({ ideas }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [inputVal, setInputVal] = React.useState<string>("");
  const lowerCaseInput = inputVal.toLowerCase();
  const filteredIdeas = React.useMemo(
    () =>
      ideas.filter((idea) => idea.title.toLowerCase().includes(lowerCaseInput)),
    [ideas, inputVal]
  );
  const isClosed = React.useRef<boolean>(true);

  return (
    <Container>
      <InputWrapper>
        <IoSearch />
        <Input
          value={inputVal}
          onChange={(event) => {
            setInputVal(event.target.value);
            isClosed.current = false;
          }}
          type="search"
          placeholder={t("placeholder.search") as string}
        />
      </InputWrapper>
      {isClosed.current ||
      inputVal.length === 0 ||
      filteredIdeas.length === 0 ? undefined : (
        <>
          <Divider />
          <EntryList>
            {filteredIdeas.map((el) => (
              <Entry
                key={el.id}
                onClick={() => {
                  isClosed.current = true;
                  setInputVal(el.title);
                  navigate(`/ideaInfo/${el.id}`);
                }}
              >
                {el.title}
              </Entry>
            ))}
          </EntryList>
        </>
      )}
    </Container>
  );
};
