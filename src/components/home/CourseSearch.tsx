// src/components/home/CourseSearch.tsx
import Input from "../common/Input";
import Button from "../common/Button";

const CourseSearch = () => {
  return (
    <div className="flex max-w-2xl mx-auto mt-6">
      <Input placeholder="Search Course" />
      <Button label="Search Course" />
    </div>
  );
};

export default CourseSearch;