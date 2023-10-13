import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce,
  useSortBy,
  usePagination,
} from "react-table";

import api from "~/utils/services/api";
import useAuth from "~/utils/hooks/useAuth";
import { Permission } from "../Core/Permission";

import { SortIcon, SortUpIcon, SortDownIcon } from "./_Shared/Icons";

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const navigate = useNavigate();

  const goCreate = () => navigate("../user/create");

  const refreshUsers = debounce((e) => {
    const event = new CustomEvent("refresh-users");
    window.dispatchEvent(event);
  }, 1000);

  return (
    <div className="row d-flex align-items-center mb-2">
      <div className="col-md-6">
        <div className="form-group wicon">
          <i className="fas fa-search left"></i>
          <input
            type="text"
            className="form-control search"
            value={value || ""}
            onChange={(e) => {
              setValue(e.target.value);
              onChange(e.target.value);
            }}
            placeholder={`Pesquisar ${count} ${count > 1 ? "usuários" : "usuário"}`}
          />
        </div>
      </div>
      <div className="col-md-6 d-flex align-items-center justify-content-end">
        <button className="btn btn-refresh mr-3" onClick={refreshUsers}>
          <i className="far fa-sync"></i>
        </button>
        <Permission required={["admin", "create_user"]}>
          <button className="btn btn-create-table" onClick={goCreate}>
            <i className="far fa-plus mr-1"></i> Novo usuário
          </button>
        </Permission>
      </div>
    </div>
  );
}

// This is a custom filter UI for selecting
// a unique option from a list
export function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id, render },
}) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <label className="flex gap-x-2 items-baseline">
      <span className="text-gray-700">{render("Header")}: </span>
      <select
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        name={id}
        id={id}
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value="">All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

export function TableUsers({ columns, data }) {
  const { user } = useAuth();

  async function handleDelete(id) {
    if (id) {
      try {
        const { data } = await api.delete(`api/user/${id}`);
        const { error, message } = data;

        if (message) {
          toast.success(message);

          const event = new CustomEvent("refresh-users");
          window.dispatchEvent(event);
        } else {
          toast.error(error);
        }
      } catch (ex) {
        toast.error("Houve um problema com o servidor!");
      }
    } else {
      toast.error("Faltando {id}");
    }
  }

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,

    state,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters, // useFilters!
    useGlobalFilter,
    useSortBy,
    usePagination // new
  );

  // Render the UI for your table
  return (
    <>
      <div>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        {headerGroups.map((headerGroup) =>
          headerGroup.headers.map((column) =>
            column.Filter ? (
              <div className="mt-2 sm:mt-0" key={column.id}>
                {column.render("Filter")}
              </div>
            ) : null
          )
        )}
      </div>
      {/* table */}
      <table {...getTableProps()} className="table-customers">
        <thead className="bg-gray-50">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  scope="col"
                  className="group px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <div className="d-flex align-items-center">
                    {column.render("Header")}
                    {/* Add a sort direction indicator */}
                    <span className="ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <SortDownIcon />
                        ) : (
                          <SortUpIcon />
                        )
                      ) : (
                        <SortIcon />
                      )}
                    </span>
                  </div>
                </th>
              ))}
              <Permission required={["admin", "edit_user", "delete_user"]}>
                <th></th>
              </Permission>
            </tr>
          ))}
        </thead>
        <tbody
          {...getTableBodyProps()}
          className="bg-white divide-y divide-gray-200"
        >
          {page.map((row, i) => {
            // new
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                <td>{row.original.name}</td>
                <td>{row.original.email}</td>
                <td>{row.original.permissions}</td>
                <td>{row.original.createdAt}</td>
                <Permission required={["admin", "edit_user", "delete_user"]}>
                  <td>
                    <div className="dropdown">
                      <i
                        className="far fa-ellipsis-v mr-3"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      ></i>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Permission required={["admin", "edit_user"]}>
                          <Link
                            className="dropdown-item"
                            to={`../user/edit/${row.original.id}`}
                          >
                            <i className="fas fa-pencil-alt mr-2"></i>
                            Editar
                          </Link>
                        </Permission>
                        <Permission required={["admin", "delete_user"]}>
                          {user.id !== row.original.id && (
                              <button
                                className="dropdown-item"
                                onClick={() => {
                                  if (
                                    window.confirm(
                                      `Deseja excluir "${row.original.name}"?`
                                    )
                                  ) {
                                    handleDelete(row.original.id);
                                  }
                                }}
                              >
                                <i className="fas fa-trash-alt mr-2"></i>
                                Remover
                              </button>
                            )}
                        </Permission>
                      </div>
                    </div>
                  </td>
                </Permission>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="py-3 d-flex align-items-center justify-content-between">
        <div className="row">
          <div className="col-md-12">
            <div className="form-group mb-4 select-wrapper">
              <label htmlFor="size">
                Página {state.pageIndex + 1} de {pageOptions.length}
              </label>
              <select
                id="size"
                className="form-control step"
                style={{ width: "200px" }}
                value={state.pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                }}
              >
                {[10, 20, 50].map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(0)}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">First</span>
                <i className="far fa-chevron-double-left" />
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <span className="sr-only">Previous</span>
                <i className="far fa-chevron-left"></i>
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <span className="sr-only">Next</span>
                <i className="far fa-chevron-right"></i>
              </button>
            </li>
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => gotoPage(pageCount - 1)}
                disabled={!canNextPage}
              >
                <span className="sr-only">Last</span>
                <i className="far fa-chevron-double-right" />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
