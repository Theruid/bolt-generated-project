CREATE TABLE transactions (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      description TEXT,
      amount DECIMAL,
      type TEXT,
      date DATE,
      category TEXT
    );
