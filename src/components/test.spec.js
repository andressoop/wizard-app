import { mount } from '@vue/test-utils';
import ProjectCard from './ProjectCard.vue';

describe('test', () => {
    it('works', () => {
        let wrapper = mount(ProjectCard)

        expect(true).toBe(true)
    });
    it('has a h5 element', () => {
        let wrapper = mount(ProjectCard);
        expect(wrapper.contains('h5')).toBe(true);
    });
});