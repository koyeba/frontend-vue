import { mount } from '@vue/test-utils';
import RestaurantReview from './review.vue';

const mockReview = {
  id: "test-review-1", 
  rating: 4,
  text: "Great restaurant!\n\nI really enjoyed the food."
};

describe(`restaurant-review`, () => {
  test(`no props`, (context) => {
    const wrapper = mount(RestaurantReview, {
      global: { plugins: [context.router] }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  it(`renders a review`, (context) => {
    const wrapper = mount(RestaurantReview, {
      global: { plugins: [context.router] },
      props: { review: mockReview }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
