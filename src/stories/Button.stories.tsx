
import type { Meta, StoryObj } from '@storybook/react';
import Button from '../components/Button'; // Pfad zu deiner Button-Datei

const meta: Meta<typeof Button> = {
  title: 'Design System/Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    children: { 
      control: 'text', 
      description: 'Der Text oder Inhalt im Button' 
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'disabled'],
      description: 'Wählt einen der vordefinierten Design-Stile',
    },
    className: { 
      control: 'text', 
      description: 'Zusätzliche oder überschreibende Tailwind-Klassen' 
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

// 1. Story: Der primäre grüne Button
export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: "primary",
  },
};

// 2. Story: Der graue Sekundär-Button
export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    className: "p-[6px] rounded active:bg-rose-500"
  },
};

// 3. Story: Der rote Gefahren-Button
export const Danger: Story = {
  args: {
    children: 'Löschen',
    variant: "danger",
    className: "w-[200px]"
  },
};

// 4. Story: Kombination aus Variante + zusätzlichen Klassen
export const Kombiniert: Story = {
  args: {
    children: 'Großer Button',
    variant: 'primary',
    className: 'w-48 h-12 text-lg rounded-lg font-bold shadow-md m-2', 
  },
};

export const PlaygroundButton: Story = {
    args: {
        children: "Test",
        variant: 'primary',
        className: "text-lg rounded-lg font-bold shadow-md m-2 w-[40px] h-[40px] hover:scale-105 active:scale-95 uppercase", 
    }
}