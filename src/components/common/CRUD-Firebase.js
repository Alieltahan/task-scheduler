import { addDoc, deleteDoc, getDocs, updateDoc } from 'firebase/firestore';
import toast from 'react-hot-toast';

/**
 * @param {Path} objRef Path to the desired collection
 * @returns Collection of docs
 */
export const getDocsFn = async (objRef) => {
  try {
    return await getDocs(objRef);
  } catch (err) {
    toast.error(err.message);
  }
};

/**
 * @param {PathRef} tasksRef Path
 * @param {*} taskObj
 * @returns
 */
export const addDocFn = async (objRef, taskObj) => {
  try {
    await addDoc(objRef, taskObj);
    toast.success(`Task has been added`);
    return { status: 'success' };
  } catch (err) {
    toast.error(err.message);
    return { status: 'error' };
  }
};

/**
 * @param {Path} objRef Path To The Doc Ref
 * @returns Object.status & Object.msg
 */
export const DelDocFn = async (objRef) => {
  try {
    await deleteDoc(objRef);
    toast.success(`Task has been deleted`);
    return { status: 'success' };
  } catch (err) {
    toast.error(err.message);
    return { status: 'error' };
  }
};

/**
 * @param {PathRef} objRef Path To The Doc Ref
 * @param {Object} updateObj an object to be updated
 * @returns Object.status & Object.msg
 */
export const UpdateDocFn = async (objRef, updateObj) => {
  try {
    await updateDoc(objRef, updateObj);
    toast.success(`Doc had been updated`);
    return { status: 'success' };
  } catch (err) {
    toast.error(err.message);
    return { status: 'error' };
  }
};
