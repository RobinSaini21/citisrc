import React from "react";
import { useFormik, ErrorMessage, FieldArray, FormikProvider } from "formik";
import * as Yup from "yup";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import Box from "@mui/material/Box";
import GoogleAuto from "../../common/GoogleAutoComplete";
import { TimePicker } from "@mui/x-date-pickers";
import { Field } from "formik";
import { useState, useEffect, useRef } from "react";
import TextError from "../../common/TextError";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Hastag from "./Hastags";

function ActivityForm({ idx, length, recreate, destroy }) {
  const [validate, setValidate] = useState({
    validateHasTags: "",
    validateAddress: "",
  });
  const [validateHasTags, setValidateHasTags] = useState(false);
  const [validateAddress, setValidateAddress] = useState(false);
  const [address, setAddress] = useState({});
  const [hastag, setHastage] = useState({
    hastag_: "",
  });
  const [img, setImg] = useState([]);
  const [imgs, setImgs] = useState([]);
  const [startDate, setStartDate] = useState({});
  const imgRef = useRef();
  const values = {
    address: address,
    date: null,
    arrivetime: null,
    departtime: null,
    activitydescription: "",
    phonenumber: "",
    costperperson: "",
    experiencename: "",
    hastags: [
      {
        hastag_: "",
      },
    ],
  };

  const getplace = (place) => {
    if (place === null) {
      return;
    } else {
      setAddress(place);
    }
    console.log(address);
  };

  const handleSubmit = (val) => {
    setTimeout(() => {
      alert(JSON.stringify(val, null, 2));
    }, 400);
  };

  const validateDate = new Date();
  const formik = useFormik({
    initialValues: values,
    validationSchema: Yup.object({
      hastags: Yup.array()
        .min(5, "Add Upto 5 Tags")
        .required("Must have 5 Tags"),

      date: Yup.date().required("Required").nullable(),
      arrivetime: Yup.date().required("Required").nullable(),
      departtime: Yup.date().required("Required").nullable(),
      address: Yup.object().required("Required").nullable(),
      experiencename: Yup.string().required("Required").nullable(),
      activitydescription: Yup.string().required("Required"),
      phonenumber: Yup.string().required("Required"),
      costperperson: Yup.string().required("Required"),
      // hastags_: Yup.array().required("Required").nullable(),
    }),
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  console.log(formik.values.friends);
  return (
    <>
      <FormikProvider value={formik}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <div key={idx} className="tab-content" id="pills-tabContent2">
            <div
              className="tab-pane fade show active"
              id="day1"
              role="tabpanel"
              aria-labelledby="day-tab"
            >
              <div id="accordion" className="collapse_box">
                <div className="card">
                  <div className="card-header" id="headingOne">
                    <h5 className="d-flex align-items-center justify-content-between black_text">
                      <span>Activity {idx + 1}</span>
                      {idx + 1 === length ? (
                        <button
                          className="btn btn-link"
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                          onClick={() => recreate()}
                        >
                          <img src="/img/add_icon_white.svg" alt="" />
                        </button>
                      ) : (
                        <button
                          style={{
                            border: "none",
                            background: "none",
                          }}
                          data-toggle="collapse"
                          data-target="#collapseOne"
                          aria-expanded="false"
                          aria-controls="collapseOne"
                          onClick={() => destroy()}
                        >
                          <img src="/img/Delete.png" alt="" />
                        </button>
                      )}
                    </h5>
                  </div>

                  <div
                    id="collapseOne"
                    className="collapse"
                    aria-labelledby="headingOne"
                    data-parent="#accordion"
                  >
                    <div className="card-body">
                      <div className="collapse_body">
                        <div className="media">
                          <div className="media-left">
                            <img
                              className="w-100"
                              src="/img/card_img.png"
                              alt=""
                            />
                          </div>
                          <div className="media-body">
                            <h5 className="m-0 black_text d-flex align-items-center justify-content-between">
                              <span>Pool party at Tamboo Hotel</span>
                              <a href="#" title="">
                                <img src="/img/drag_up_down_icon.svg" alt="" />
                              </a>
                            </h5>
                            <p className="gray_text">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Donec odio mattis vitae dictumst aenean nunc
                              nunc aenean. Consectetur dignissim integer gravida
                              augue hendrerit urna. Volutpat, nunc elementum
                              odio nibh pellentesque vel fermentum. In et
                              accumsan, tincidunt amet erat ut senectus urna.
                              Platea augue vulputate varius dignissim. Lectus
                              elementum at tellus id ullamcorper eget. Etiam
                              egestas posuere sed eget vel.
                            </p>
                            <button
                              type="button"
                              className="btn outline_btn orange_text edit_btn"
                            >
                              Edit
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <button type="button" className="btn">
                        Post Itinerary
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="public_form">
                <div className="row align-items-end rowgap_12">
                  <div className="form-group col-md-6">
                    <label>Experience Name</label>
                    <input
                      name="experiencename"
                      value={formik.values.experiencename}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      type="text"
                      className="form-control"
                      placeholder="Pool Party at Tamboo Hotel"
                    />
                    {formik.touched.experiencename &&
                    formik.errors.experiencename ? (
                      <small className="form-text text-danger">
                        {formik.errors.experiencename}
                      </small>
                    ) : null}
                  </div>
                  <div className="form-group col-md-6">
                    <label>Date</label>

                    <DatePicker
                      name="date"
                      className="form-control"
                      selected={formik.values.date}
                      onChange={(value) => {
                        formik.setFieldValue("date", value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.date && formik.errors.date ? (
                      <small className="form-text text-danger">
                        {formik.errors.date}
                      </small>
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <label>Average Spending Time</label>
                    <TimePicker
                      value={formik.values.arrivetime}
                      onChange={(value) => {
                        formik.setFieldValue("arrivetime", value);
                        console.log(formik.values.arrivetime);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            underline: {
                              "&&&:before": {
                                borderBottom: "none",
                              },
                              "&&:after": {
                                borderBottom: "none",
                              },
                            },
                          }}
                          sx={{ border: "1px solid green", borderRadius: 1 }}
                          disableUnderline
                          style={{
                            border: "1px solid grey",
                            borderRadius: "4px",
                          }}
                          {...params}
                        />
                      )}
                    />
                    {formik.touched.arrivetime && formik.errors.arrivetime ? (
                      <small className="form-text text-danger">
                        {formik.errors.arrivetime}
                      </small>
                    ) : null}
                  </div>
                  <div className="form-group col-6">
                    <TimePicker
                      value={formik.values.departtime}
                      onChange={(value) => {
                        formik.setFieldValue("departtime", value);
                      }}
                      renderInput={(params) => (
                        <TextField
                          fullWidth
                          sx={{ border: "1px solid green", borderRadius: 1 }}
                          disableUnderline
                          style={{
                            border: "1px solid grey",
                            borderRadius: "4px",
                          }}
                          {...params}
                        />
                      )}
                    />
                    {formik.touched.departtime && formik.errors.departtime ? (
                      <small className="form-text text-danger">
                        {formik.errors.departtime}
                      </small>
                    ) : null}
                  </div>
                </div>
                <div className="form-group">
                  <label>Images</label>
                  <div className="upload_div row m-0">
                    <div className="images_box row m-0 align-items-center order-md-1">
                      {img.length === 0
                        ? null
                        : img.map((data, idx) => (
                            <div
                              key={idx}
                              className="card_img position-relative order-md-1"
                            >
                              <img className="w-100" src={data} alt="" />
                              <a
                                onClick={() => {
                                  const filteredimg = img.filter(
                                    (img_) => img_ !== data
                                  );
                                  setImg(filteredimg);
                                }}
                              >
                                <img src="/img/delete_icon.svg" alt="" />
                              </a>
                            </div>
                          ))}
                      <div className="upload_box">
                        <label
                          // htmlFor="exampleFormControlFile1"
                          className="m-0 d-flex align-items-center justify-content-center"
                        >
                          <button
                            type="button"
                            style={{
                              width: "110px",
                              height: "110px",
                              background: "transparent",
                              border: "none",
                            }}
                            onClick={() => {
                              imgRef.current.click();
                            }}
                          >
                            {" "}
                            <img src="/img/add_icon.svg" alt="" />
                          </button>
                        </label>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          ref={imgRef}
                          onChange={(e) => {
                            const imgUrl = URL.createObjectURL(
                              e.target.files[0]
                            );
                            console.log(imgUrl);
                            setImg((prv) => [...prv, imgUrl]);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Address</label>

                  <Field
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    component={GoogleAuto}
                    getPlace={getplace}
                    className="form-control"
                  />

                  {validateAddress ? (
                    <small className="form-text text-danger">Required</small>
                  ) : null}
                </div>
                <div className="form-group">
                  <label>Activity Description</label>
                  <input
                    name="activitydescription"
                    value={formik.values.activitydescription}
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control h_90"
                    rows="3"
                    placeholder="Type here..."
                  />
                  <small className="form-text d-block text-right">
                    0 / 300
                  </small>
                  {formik.touched.activitydescription &&
                  formik.errors.activitydescription ? (
                    <small className="form-text text-danger">
                      {formik.errors.activitydescription}
                    </small>
                  ) : null}
                </div>
                <div className="row align-items-end">
                  <div className="form-group col-md-6">
                    <label>Phone Number</label>
                    <div className="position-relative code_text">
                      <span className="black_text position-absolute">
                        +01&nbsp;&nbsp;
                      </span>
                      <input
                        name="phonenumber"
                        value={formik.values.phonenumber}
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        maxLength="10"
                        className="form-control"
                        placeholder="00000-00000"
                      />
                      {formik.touched.phonenumber &&
                      formik.errors.phonenumber ? (
                        <small className="form-text text-danger">
                          {formik.errors.phonenumber}
                        </small>
                      ) : null}
                    </div>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Cost Per Person</label>
                    <div className="position-relative code_text">
                      <span className="black_text position-absolute cost_text">
                        +$&nbsp;&nbsp;
                      </span>
                      <input
                        name="costperperson"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.costperperson}
                        type="text"
                        maxLength="4"
                        className="form-control"
                        placeholder="0,000"
                      />
                      {formik.touched.costperperson &&
                      formik.errors.costperperson ? (
                        <small className="form-text text-danger">
                          {formik.errors.costperperson}
                        </small>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label>Hastags</label>
                  <FieldArray
                    name="hastags"
                    render={({ remove, push }) => (
                      <>
                        <div class="form-group">
                          <div class="d-flex add_box">
                            <input
                              className="form-control"
                              type="text"
                              value={hastag.hastag_}
                              onChange={(e) =>
                                setHastage({
                                  ...hastag,
                                  hastag_: e.target.value,
                                })
                              }
                              placeholder="#Hastag"
                            />
                            <button
                              type="button"
                              class="btn blue_btn"
                              onClick={() => {
                                push(hastag);
                                setHastage({ ...hastag, hastag_: "" });
                              }}
                            >
                              Add
                            </button>
                          </div>
                          {formik.errors.hastags && formik.touched.hastags && (
                            <small className="form-text  text-danger">
                              {formik.errors.hastags}
                            </small>
                          )}

                          <div className="hastags">
                            {formik.values.hastags.length > 0 &&
                              formik.values.hastags.map((friend, index) => {
                                console.log(index);
                                return (
                                  <>
                                    <a
                                      title=""
                                      class="hastag_btn"
                                      onClick={() => remove(index)}
                                    >
                                      {formik.values.hastags[index].hastag_}
                                      <img src="/img/close_icon.svg" alt="" />
                                    </a>
                                  </>
                                );
                              })}
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
                <div className="text-right save_post">
                  <button
                    type="submit"
                    onClick={formik.handleSubmit}
                    className="btn outline_btn orange_text"
                  >
                    Save
                  </button>
                  <button type="button" className="btn">
                    Post Itinerary
                  </button>
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="day2"
              role="tabpanel"
              aria-labelledby="day2-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="day3"
              role="tabpanel"
              aria-labelledby="day3-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="day4"
              role="tabpanel"
              aria-labelledby="day4-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="day5"
              role="tabpanel"
              aria-labelledby="day5-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="day6"
              role="tabpanel"
              aria-labelledby="day6-tab"
            >
              ...
            </div>
            <div
              className="tab-pane fade"
              id="day7"
              role="tabpanel"
              aria-labelledby="day7-tab"
            >
              ...
            </div>
          </div>
        </LocalizationProvider>
      </FormikProvider>
    </>
  );
}

export default ActivityForm;
