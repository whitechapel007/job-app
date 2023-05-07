import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1;
  });

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) {
      newPage = 1;
    }
    changePage(newPage);
  };
  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) {
      newPage = numOfPages;
    }
    changePage(newPage);
  };

  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft /> prev
      </button>

      <span className="btn-container">
        {pages.map((item) => (
          <button
            type="button"
            className={page === item ? "pageBtn active" : "pageBtn"}
            key={item}
            onClick={() => changePage(item)}
          >
            {item}
          </button>
        ))}
      </span>

      <button className="next-btn" onClick={nextPage}>
        <HiChevronDoubleRight /> next
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
