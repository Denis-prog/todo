const renderElement = (data, template, targetBox) => {
    const element = template(data);
    targetBox.insertAdjacentHTML('beforeend', element);
};

export default renderElement;
