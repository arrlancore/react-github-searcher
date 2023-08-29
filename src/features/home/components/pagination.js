import { renderComponentIf } from "lib/render";
import { styled } from "styled-components";
import PropTypes from "prop-types";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #e1e4e8;
  border-radius: 4px;
  cursor: pointer;
  background-color: #fafbfc;
  &:hover {
    background-color: #f6f8fa;
  }
`;

const HideOnMobileDiv = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const renderFirstEllipsis = currentPage - 2 > 1;
  const renderLastEllipsis = currentPage + 2 < totalPages;
  return (
    <PaginationWrapper>
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previous
      </PageButton>

      <HideOnMobileDiv>
        {renderComponentIf(currentPage - 1 > 1)(
          <PageButton onClick={() => onPageChange(1)}>{1}</PageButton>
        )}

        {renderFirstEllipsis && "..."}
      </HideOnMobileDiv>

      {renderComponentIf(currentPage > 1)(
        <PageButton onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </PageButton>
      )}

      <PageButton style={{ backgroundColor: "#333", color: "white" }}>
        {currentPage}
      </PageButton>

      {renderComponentIf(currentPage < totalPages)(
        <PageButton onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </PageButton>
      )}

      <HideOnMobileDiv>
        {renderLastEllipsis && "..."}

        {renderComponentIf(currentPage + 1 < totalPages)(
          <PageButton onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PageButton>
        )}
      </HideOnMobileDiv>

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </PageButton>
    </PaginationWrapper>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
