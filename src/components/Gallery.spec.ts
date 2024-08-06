import { shallowMount } from "@vue/test-utils";
import Gallery from "@/components/Gallery.vue";

describe("Gallery.vue", () => {
  it("renders images when passed as a prop", () => {
    const images = [
      { url: "http://example.com/image1.jpg", file: { id: 1 } },
      { url: "http://example.com/image2.jpg", file: { id: 2 } },
    ];
    const wrapper = shallowMount(Gallery, {
      propsData: { images },
    });
    const renderedImages = wrapper.findAll(".image");
    expect(renderedImages.length).toBe(images.length);
  });

  it('emits "removeFromGallery" when remove button is clicked', async () => {
    const images = [{ url: "http://example.com/image1.jpg", file: { id: 1 } }];
    const wrapper = shallowMount(Gallery, {
      propsData: { images },
    });
    await wrapper.find(".font-button").trigger("click");
    expect(wrapper.emitted().removeFromGallery).toBeTruthy();
  });
});
