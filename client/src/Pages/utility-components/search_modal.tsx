import { useState } from "react";
import { Modal } from "react-bootstrap";
import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { Product } from "../../Types";

export default function Search_modal(): React.ReactNode {
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { products, error, isLoading } = useProducts();

  const handle_close = () => {
    setShow(false);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setShow(true)}
        type="button"
        className="btn button_box bg-black text-white"
      >
        <SearchIcon />
      </button>
      {loading && <div>loading...</div>}
      <Modal
        className="search_modal"
        show={show}
        onHide={handle_close}
        role="dialog"
      >
        <Modal.Body>
          <Autocomplete
            freeSolo
            id="sandwich_search_bar"
            getOptionLabel={(option: Product | string) =>
              typeof option === "object" ? option.name : option
            }
            renderOption={(_, option: Product) => (
              <Link
                key={option.name}
                to={`/shop/${option.id}`}
                className="navbar-item"
              >
                {option.name}
              </Link>
            )}
            options={products}
            disableClearable
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Sandwich"
                inputProps={{
                  ...params.inputProps,
                  type: "search",
                }}
              />
            )}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
