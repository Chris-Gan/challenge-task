import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import NavItem from '@/app/_components/Navbar/NavItem';

describe('NavItem component', () => {
  it('renders NavItem with the correct label and url', () => {
    render(<NavItem label='Home' url='/home' />);
    const linkElement = screen.getByText('Home');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/home');
  });

  it('changes styles on hover', () => {
    render(<NavItem label='Home' url='/home' />);
    const linkElement = screen.getByText('Home');

    fireEvent.mouseOver(linkElement);

    fireEvent.mouseOut(linkElement);
  });

  it('changes styles on focus', () => {
    render(<NavItem label='Home' url='/home' />);
    const linkElement = screen.getByText('Home');

    fireEvent.focus(linkElement);

    fireEvent.blur(linkElement);
  });

  it('updates based on props changes', () => {
    const { rerender } = render(<NavItem label='Home' url='/home' />);
    let linkElement = screen.getByText('Home');
    expect(linkElement.getAttribute('href')).toBe('/home');

    rerender(<NavItem label='About' url='/about' />);
    linkElement = screen.getByText('About');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('/about');
  });
});
