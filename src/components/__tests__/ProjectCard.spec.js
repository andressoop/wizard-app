import { mount } from "@vue/test-utils";
import ProjectCard from "../ProjectCard.vue";

describe("ProjectCard", () => {
  it("has required props", () => {
    let wrapper = mount(ProjectCard);
    
    expect(wrapper.props()).toEqual(expect.objectContaining({
      projectCreatedOn: undefined,
      projectId: undefined,
      projectName: undefined,
    }))
  });
});

describe("ProjectCard", () => {
  it("has a h5 element", () => {
    let wrapper = mount(ProjectCard);
    expect(wrapper.contains(".card-deck")).toBe(true);
  });
});

describe("ProjectCard", () => {
  it("has a view project button saying 'View Project'", () => {
    const wrapper = mount(ProjectCard);
    const button = wrapper.find('.btn-primary'); 
    expect(button.text()).toEqual('View Project');
  });
});

describe("ProjectCard", () => {
  it("has a delete project button saying 'Delete'", () => {
    const wrapper = mount(ProjectCard);
    const button = wrapper.find('.btn-outline-danger'); 
    expect(button.text()).toEqual('Delete');
    console.log(wrapper.vm)
  });
});