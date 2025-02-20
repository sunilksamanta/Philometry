'use client';

import PageHeader from '@/components/PageHeader';
import {BinaryTreeTeacher} from './BinaryTreeTeacher';

export default function FernPage() {
  return (
    <div>
      <PageHeader 
        title="Binary Tree"
        description="Visualize branching patterns and understand recursive growth through an interactive tree generator."
        group="Recursion"
        category="Natural Patterns"
        difficulty="Intermediate"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <BinaryTreeTeacher />
      </div>
    </div>
  );
}