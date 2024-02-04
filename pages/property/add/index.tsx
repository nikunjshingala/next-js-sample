import BasicContainer from '@components/basic-container';
import { useGlobalContext } from 'contexts';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import get from 'lodash-es/get';
import { getCityLists, getStateList } from 'hooks/useCommon';
import RemoveIcon from '@components/atoms/icons/Remove';
import { useProperty } from 'hooks/useProperty';
import { useStorage } from '@utils/Storage.client';
import { STORAGE_KEYS } from '@utils/keys';
import Loader from '@components/molesuos/Loader';
import { useRouter } from 'next/router';
import { ROUTE_NAMES } from '@utils/routes';
import { strings } from '@utils/strings';

type AvailablityOption = 'Immediately' | 'Not Available' | 'After While';
type PropsType = {
  states: {
    id: number;
    name: string;
  }[];
};
const NewPropertyPage = ({ states }: PropsType) => {
  const { toggleHamBurger, isHamburgerOpen } = useGlobalContext();
  const data = {
    propertyName: null,
    state: null,
    city: null,
    lat: null,
    long: null,
    area: null,
    address: null,
    price: 0,
    deposit: 0,
    other_charges: [
      {
        charges: null,
        chargeValue: null,
      },
    ],
    availablity: 'Immediately',
  };

  const validationSchema = Yup.object().shape({
    propertyName: Yup.string().required('Please enter property name'),
    state: Yup.string().required('Please choose state'),
    city: Yup.string().required('Please choose city'),
    lat: Yup.string().required('Please enter lat'),
    long: Yup.string().required('Please enter long'),
    area: Yup.string().required('Please enter area of location'),
    address: Yup.string().required('Please enter property address'),
    price: Yup.string()
      .min(0)
      .required('Please enter minimum price of property'),
    deposit: Yup.string().required('Please enter deposit'),
    availablity: Yup.string<AvailablityOption>().required(),
  });

  const { addPropertyState, handleAddProperty } = useProperty();
  const { getItem } = useStorage();
  const router = useRouter();

  const [citylist, setCityList] = useState([]);
  const [availablity, setAvailablity] =
    useState<AvailablityOption>('Immediately');

  const handleAvailablityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setAvailablity(event.target.value as AvailablityOption);
  };

  const getCityList = async (stateId: string | null) => {
    const data = await getCityLists(stateId);
    setCityList(data);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: any
  ) => {
    const name: any = get(e, 'target.name', null);
    const value = get(e, 'target.value', null);
    onChange(name, value);
    if (name === 'state') {
      getCityList(value);
    }
  };

  const handleAddProperySubmit = (values: object) => {
    const authData = getItem(STORAGE_KEYS.AUTH_DATA);
    const payload = {
      ...values,
      owner_id: authData?.id || '1',
      property_name: values?.propertyName,
      geolocation: {
        lat: values?.lat,
        long: values?.long
      },
      deposite: values?.deposit
    };

    delete payload?.propertyName;
    delete payload?.lat;
    delete payload?.long;
    delete payload?.deposit;
    handleAddProperty(payload);
  };

  useEffect(() => {
    if (addPropertyState?.isSuccess) {
      router.push(ROUTE_NAMES.PROERTIES);
    }
  }, [addPropertyState?.isSuccess]);

  return (
    <>
      {addPropertyState?.isLoading && <Loader />}
      <BasicContainer
        loggedin={true}
        isHamburgerOpen
        toggleHamBurger={() => toggleHamBurger(!isHamburgerOpen)}
      >
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <div className="w-full p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Create a New Property</h2>

            {addPropertyState?.isFailed && (
              <>
                <div className='text-red-500'>{strings.smth_wrng}</div>
              </>
            )}
            <Formik
              initialValues={data}
              validationSchema={validationSchema}
              onSubmit={(values) => handleAddProperySubmit(values)}
            >
              {({ errors, touched, setFieldValue, values }) => (
                <Form>
                  <div className="grid grid-cols-2 gap-3 space-y-4">
                    <div className="flex flex-col space-y-2 mt-3">
                      <label htmlFor="property-name" className="font-medium">
                        Property Name:
                      </label>
                      <Field
                        id="property-name"
                        type="text"
                        name="propertyName"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                      />
                      {errors?.propertyName && touched?.propertyName ? (
                        <div className="text-red-500">
                          {errors.propertyName}
                        </div>
                      ) : null}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="state" className="font-medium">
                        State:
                      </label>
                      <Field
                        as="select"
                        id="state"
                        name={`state`}
                        onChange={(e) => handleChange(e, setFieldValue)}
                        className="rounded-md border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2"
                      >
                        <option value="">Choose any state</option>
                        {states?.map((state: { id: number; name: string }) => (
                          <option value={state?.id} key={state?.name}>
                            {state?.name}
                          </option>
                        ))}
                      </Field>
                      {errors?.state && touched?.state ? (
                        <div className="text-red-500">{errors.state}</div>
                      ) : null}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="city" className="font-medium">
                        City:
                      </label>
                      <Field
                        as="select"
                        id="city"
                        name={`city`}
                        className="rounded-md border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2"
                      >
                        <option value="">Choose any city</option>
                        {citylist?.map((city: { id: number; name: string }) => (
                          <option value={city?.id} key={city?.name}>
                            {city?.name}
                          </option>
                        ))}
                      </Field>
                      {errors?.city && touched?.city ? (
                        <div className="text-red-500">{errors.city}</div>
                      ) : null}
                    </div>
                    <div className="flex flex-row mb-4 gap-3">
                      <div>
                        Lat:{' '}
                        <Field
                          type={`text`}
                          name={'lat'}
                          className={
                            'w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500'
                          }
                        />
                        {errors?.lat && touched?.lat ? (
                          <div className="text-red-500">{errors.lat}</div>
                        ) : null}
                      </div>
                      <div>
                        Long:{' '}
                        <Field
                          type={`text`}
                          name={'long'}
                          className={
                            'w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500'
                          }
                        />
                        {errors?.long && touched?.long ? (
                          <div className="text-red-500">{errors.long}</div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold mb-2">Address</label>
                      <Field
                        as="textarea"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        name="address"
                      ></Field>
                      {errors?.address && touched?.address ? (
                        <div className="text-red-500">{errors.address}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold mb-2">Area</label>
                      <Field
                        as="textarea"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        name="area"
                      ></Field>
                      {errors?.area && touched?.area ? (
                        <div className="text-red-500">{errors.area}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold mb-2">Price</label>
                      <Field
                        type="number"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        name="price"
                      />
                      {errors?.price && touched?.price ? (
                        <div className="text-red-500">{errors.price}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold mb-2">Deposit</label>
                      <Field
                        type="number"
                        className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
                        name="deposit"
                      />
                      {errors?.deposit && touched?.deposit ? (
                        <div className="text-red-500">{errors.deposit}</div>
                      ) : null}
                    </div>
                    <div className="mb-4">
                      <label className="block font-bold mb-2">
                        Other Charges
                      </label>
                      <FieldArray
                        name="other_charges"
                        render={(arrayHelpers) => (
                          <>
                            {values.other_charges.map(
                              (charge: any, index: number) => (
                                <div
                                  className="flex justify-between gap-3 m-2"
                                  key={index}
                                >
                                  <Field
                                    as="select"
                                    name={`other_charges.${index}.charges`}
                                    className="rounded-md border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2"
                                  >
                                    <option value={``}>Select Charges</option>
                                    <option value={`water`}>Water</option>
                                    <option value={`bill`}>Bill</option>
                                    <option value={`parking`}>Parking</option>
                                  </Field>

                                  <Field
                                    type="text"
                                    className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500 mb-2"
                                    name={`other_charges.${index}.chargeValue`}
                                  />

                                  <button
                                    type="button"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <RemoveIcon />
                                  </button>
                                </div>
                              )
                            )}
                            <button
                              className="px-4 py-2 bg-blue-500 text-white font-bold rounded"
                              onClick={() => arrayHelpers.push('')}
                              type="button"
                            >
                              Add
                            </button>
                          </>
                        )}
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="availablity"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Availablity
                      </label>
                      <div className="mt-1">
                        <Field
                          as="select"
                          id="availablity"
                          name="availablity"
                          value={availablity}
                          onChange={handleAvailablityChange}
                          className="rounded-md border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full p-2"
                        >
                          <option value="Immediately">Immediately</option>
                          <option value="Not Available">Not Available</option>
                          <option value="After While">After While</option>
                        </Field>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Form>
              )}
              {/* <form className="grid grid-cols-2 gap-3 space-y-4" action="javascript:void(0)">
           
          </form> */}
            </Formik>
          </div>
        </div>
      </BasicContainer>
    </>
  );
};

export async function getStaticProps(context) {
  const statesList = await getStateList();
  return {
    props: {
      states: statesList,
    }, // will be passed to the page component as props
  };
}

export default NewPropertyPage;
