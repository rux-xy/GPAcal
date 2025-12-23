import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Course } from "../utils/gpaCalculator";

/* ---------- ADD COURSE ---------- */
export async function addCourse(uid: string, course: Course) {
  const ref = collection(db, "users", uid, "courses");

  await addDoc(ref, {
    ...course,
    createdAt: serverTimestamp(),
  });
}

/* ---------- GET COURSES ---------- */
export async function getCourses(uid: string): Promise<Course[]> {
  const ref = collection(db, "users", uid, "courses");
  const snap = await getDocs(ref);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Course),
  }));
}

/* ---------- UPDATE COURSE ---------- */
export async function updateCourse(
  uid: string,
  course: Course & { id: string }
) {
  const ref = doc(db, "users", uid, "courses", course.id);
  await updateDoc(ref, course);
}

/* ---------- DELETE COURSE ---------- */
export async function deleteCourse(uid: string, courseId: string) {
  const ref = doc(db, "users", uid, "courses", courseId);
  await deleteDoc(ref);
}
