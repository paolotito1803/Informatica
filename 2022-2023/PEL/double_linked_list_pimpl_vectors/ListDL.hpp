class ListDL{

	public:
		ListDL();
		ListDL(const ListDL& s);
		~ListDL();

		int size() const;
		void print() const;

		void prepend(int e);
		void append(int e);
		int& at(int pos);

		bool operator==(const ListDL& l) const;
		const ListDL& operator=(const ListDL& l);
		ListDL operator+(const ListDL& l) const;

	private:
		struct impl;
		impl* pimpl;
};