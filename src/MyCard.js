import React, { Fragment, useState } from "react";
import {
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  makeStyles,
  Card,
  CardHeader,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    border: "1px solid black",
    padding: 8,
  },
  cardRoot: {
    maxWidth: 345,
    margin: 0,
    width: 286,
  },
}));

const MyCard = (props) => {
  const [title, setTitle] = useState(props.title);
  const [anchorEl, setAnchorEl] = useState(null);
  const [textValue, setTextValue] = useState(props.title);
  const [open, setOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [helperText, setHelperText] = useState("");
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const classes = useStyles();
  const handleDialogClose = () => {
    setTextValue("");
    setOpen(false);
    setHelperText("");
  };
  const handleAddClick = () => {
    if (!textValue) {
      setHelperText(<span style={{ color: "red" }}>Name is required.</span>);
    } else {
      setTextValue("");
      setOpen(false);
      setHelperText("");
      setTitle(textValue);
    }
  };
  const onDelete = (e) => {
    props.onDelete();
    e.stopPropagation();
  };
  return (
    <Fragment>
      <Dialog open={open}>
        <DialogTitle>Edit Card</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Name"
            label="Name"
            value={textValue}
            onChange={(e) => setTextValue(e.target.value)}
            helperText={helperText}
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="secondary"
            variant="outlined"
            onClick={handleDialogClose}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAddClick}
            disabled={textValue === ""}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => {
            setOpen(true);
            setAnchorEl(null);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          disabled={isComplete}
          onClick={() => {
            setIsComplete(true);
            setAnchorEl(null);
          }}
        >
          Mark as Complete
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            onDelete(e);
            setAnchorEl(null);
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <div style={{ marginBottom: 5 }}>
        <Card
          className={classes.cardRoot}
          style={{ backgroundColor: isComplete ? "green" : "white" }}
        >
          <CardHeader
            title={title}
            action={
              <IconButton onClick={handleMenuClick}>
                <MoreVert />
              </IconButton>
            }
          />
        </Card>
      </div>
    </Fragment>
  );
};

export default MyCard;
